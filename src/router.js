import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Homepage } from './pages/Homepage';
import { About } from './pages/Aboutpage';
import { blogLoader, Blogpage } from './pages/Blogpage';
import { Createpost, createPostAction } from './pages/Createpost';
import { Editpost, updatePostAction } from './pages/Editpost';
import { postLoader, Singlepage } from './pages/Singlepage';
import { Notfoundpage } from './pages/Notfoundpage';
import { LoginPage } from './pages/Loginpage';

import { Layout } from './components/Layout'

import { RequireAuth } from './hoc/RequireAuth'
import ErrorPage from './pages/Errorpage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Homepage />} />
    <Route path="about" element={<About />}>
      <Route path="contacts" element={<p>Our contact</p>} />
      <Route path="team" element={<p>Our team</p>} />
    </Route>
    <Route path="about-us" element={<Navigate to="/about" replace />} />
    <Route path="posts" element={<Blogpage />} loader={blogLoader} errorElement={<ErrorPage />} />
    <Route path="posts/:id" element={<Singlepage />} loader={postLoader} />
    <Route path="posts/:id/edit" element={<Editpost />} loader={postLoader} action={updatePostAction} />
    <Route path="posts/new" element={
      <RequireAuth>
        <Createpost />
      </RequireAuth>
    } action={createPostAction} />
    <Route path="login" element={<LoginPage />} />
    <Route path="*" element={<Notfoundpage />} />
  </Route>
))

export default router
