import { BiLogOut } from "react-icons/bi";
// import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	// const { loading, logout } = useLogout();
    const loading =false; // Placeholder for loading state, replace with actual loading state from useLogout hook
	return (
		<div className='mt-auto'>
			{!loading ? (
				// <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
				<BiLogOut className='w-6 h-6 text-white cursor-pointer'/>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;