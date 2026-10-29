import { Suspense } from 'react';
import Spinner from '../../components/common/Spinner.jsx';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;