import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api/auth";
const LoginPage = () => {
   const navigate = useNavigate();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleInputChange = (e, setValue) => {
      setValue(e.target.value);
   };

   const handleSignin = (e) => {
      e.preventDefault();
      signin(username, password, navigate);
   };
   return (
      <main>
         <section className="login">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-lg-5 col-md-6">
                     <h1 className="text-center mb-4">Gaming Portal</h1>
                     <div className="card card-default">
                        <div className="card-body">
                           <h3 className="mb-3">Sign In</h3>

                           <form onSubmit={handleSignin}>
                              <div className="form-group my-3">
                                 <label htmlFor="username" className="mb-1 text-muted">Username</label>
                                 <input type="text" id="username" name="username" className="form-control" autoFocus onChange={(e) => handleInputChange(e, setUsername)} />
                              </div>

                              <div className="form-group my-3">
                                 <label htmlFor="password" className="mb-1 text-muted">Password</label>
                                 <input type="password" id="password" name="password" className="form-control" onChange={(e) => handleInputChange(e, setPassword)} />
                              </div>

                              <div className="mt-4 row">
                                 <div className="col">
                                    <button type="submit" className="btn btn-primary w-100">Sign In</button>
                                 </div>
                                 <div className="col">
                                    <a href="Gaming Portal/signup.html" className="btn btn-danger w-100">Sign up</a>
                                 </div>

                              </div>
                           </form>

                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </main>
   )
}
export default LoginPage;