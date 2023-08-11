import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
  
 export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      const navigateWithData = (path, data) => {
        navigate(path, { state: data });
      };
      return (
        <Component
          {...props}
          router={{ location, navigate, params, navigateWithData }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }
