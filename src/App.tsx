// import '@mantine/core/styles.layer.css';
// import 'mantine-datatable/styles.layer.css';
// import './assets/layout.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
