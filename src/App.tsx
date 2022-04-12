import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { isDarkModeVar, isLoggedInVar } from './apollo/vars';
import { darkTheme, lightTheme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(isDarkModeVar);
  return (
    <HelmetProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
