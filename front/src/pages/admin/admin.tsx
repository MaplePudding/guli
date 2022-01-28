import React, { useEffect, useState } from 'react';
import { apiAuth } from '../../api';
import {Navigate} from 'react-router-dom';

interface AdminProps{

}

const Admin : React.FC<AdminProps> = function(props : AdminProps){
  const [redirect, setRedirect] = useState(false)

  useEffect(() => apiAuth(redirect, setRedirect),[])
    return(
        <div>
          {redirect && <Navigate to="/login" />}
            Admin
        </div>
    )
}

export default Admin



