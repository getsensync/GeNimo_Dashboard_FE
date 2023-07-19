import React from 'react'
import { useAuthContext } from 'src/contexts/auth-context'

export const Authorization = (props) => {
  const { user } = useAuthContext();
  const { roles, children } = props;
  if (!user) {
    return null;
  }

  if (roles && !roles.includes(user.role)) {
    return null;
  }

  return children;
};  