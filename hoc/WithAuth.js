import routes from '@/utils/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const WithAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (!user) {
        router.replace(routes.login);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default WithAuth;
