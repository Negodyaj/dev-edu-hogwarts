import { useSelector } from 'react-redux';
import { LoginPageState } from '../store/reducers/login.reducer';
import { AppState } from '../store/store';
import { FilterItem, FilterList } from '../components/FilterList/FilterList';
import { UserRoles } from '../shared/enums/UserRoles';


export const selectUserRoles = () => {
  const { currentUser } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );
if (currentUser){
      const idForRoles = (()=>{
        switch (UserRoles) {
          case UserRoles.Admin:
            return 1;
          case UserRoles.Manager:
            return 2;


            default:
              return 0;
           
      }})();
    }

      currentUser&&
      currentUser.roles.length>1 ? (
      <FilterList data={currentUser.roles.map((role)=>
        {
          const newRole: FilterItem = {
            id:1,
            name:role,
          }
          return newRole;
        })}
    />):'';
}