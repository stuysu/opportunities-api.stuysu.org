import models from "../database";
var moment = require("moment-timezone");

const checkIfOpportunityPastDeadline = opportunity => {
	//console.log(opportunity.appDeadline);
	const deadline = moment.utc(opportunity.appDeadline);
	if(deadline === moment.utc("1970-01-01 00:00:00")) { // rolling basis
		if (opportunity.archived) {
			opportunity.archived = false;
			opportunity.save();
			console.log(`Opportunity with ID ${opportunity.id} unarchived due to being rolling basis!`);
		}
		return;
	}
	// treat deadline as 23:59:59 eastern time
	deadline.add(23, "hours").add(59, "minutes").add(59, "seconds");
	// converts time to NY time, including daylight savings, without changing "stated" time
	deadline.tz("America/New_York", true);
	// converts time back to UTC, changing stated time to match same time instance
	deadline.utcOffset(0, false);
	// DEBUG: console.log(deadline.format());
	const curTime = new moment();
	// DEBUG: console.log(curTime.format());
	if (deadline.isBefore(curTime)) {
		if (!opportunity.archived) {
			opportunity.archived = true;
			opportunity.save();
			console.log(`Opportunity with ID ${opportunity.id} archived!`);
		}
	} else {
		if (opportunity.archived) {
			opportunity.archived = false;
			opportunity.save();
			console.log(`Opportunity with ID ${opportunity.id} un-archived!`);
		}
	}
};

const archivePostDeadlineOpportunities = async () => {
	console.log("Running cronjob to archive outdated opportunities");
	const opportunities = await models.opportunities.findAll();
	opportunities.forEach(checkIfOpportunityPastDeadline);
};

export default archivePostDeadlineOpportunities;
