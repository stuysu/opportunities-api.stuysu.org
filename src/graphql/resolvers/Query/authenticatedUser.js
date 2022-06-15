export default async(_, args, {signedIn, user}) => {
	return(signedIn ? user : null);
}
