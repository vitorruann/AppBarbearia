import { useSelector } from 'react-redux';

import createRoutes from './routes';

const Aplica = () => {
  const isSigned = useSelector((state) => state.auth.signed);

  const Routes = createRoutes(isSigned);

  return Routes;
};

export default Aplica;
