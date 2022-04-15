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
import Signup from './screens/Signup';
import Layout from './components/Layout';
import Profile from './screens/Profile';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(isDarkModeVar);
  return (
    <HelmetProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )
              }
            />
            {!isLoggedIn ? (
              <Route path="/sign-up" element={<Signup />} />
            ) : null}
            <Route
              path="/users/:username"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
