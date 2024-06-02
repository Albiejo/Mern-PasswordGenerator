/* eslint-disable react/prop-types */
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
  import { AuthContext } from "../../context/authContext"; 
  import { useContext } from "react";
  import {useDispatch} from 'react-redux'
  import { useFormik } from "formik";
  import toast from 'react-hot-toast'
  import { validate } from "../../validations/LoginValidation";
  import {userApiRequest} from '../../config/axios' 
  import {setUserCredentials} from '../../redux/authSlice'
  import { XMarkIcon } from '@heroicons/react/24/outline';

  const initialValues= {
    email: "",
    password: "",
  };
  

  const LoginCard=({onClose})=> {


    const {handleSignupOpen}=useContext(AuthContext)

      
   
    const dispatch = useDispatch();
  
    const formik = useFormik({
      initialValues,
      validate,
      onSubmit: async(values) => {
        try {
        const response = await userApiRequest({
          method: 'post',
          url: '/login',
          data:values
        })
        if(response){
          toast.success("Login Successfull")
          dispatch(setUserCredentials(response.userData))
          localStorage.setItem('Token',response.token)
          onClose()
        }
      }catch (error) {
        toast.error(error.response.data.message)
      }
        
       
      }})
    

    return (
      <Card className="w-96 ">
        <form onSubmit={formik.handleSubmit}>
        <CardBody className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Typography variant="h3" color="black" className="text-center">
            Login
          </Typography>
          <XMarkIcon 
            className="h-6 w-6 text-gray-500 cursor-pointer" 
            onClick={onClose} 
          />
        </div>
      
        <Input
              label="Email"
              size="sm"
              crossOrigin={undefined}
              color="black"
              className="bg-white bg-opacity-50"
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formik.errors.email ? <p className="text-sm" style={{color:"red",marginBottom:-10,marginTop:-10}}>{formik.errors.email}</p> : null}
          <Input
              label="Password"
              size="sm"
              crossOrigin={undefined}
              color="black"
              className="bg-white bg-opacity-50"
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formik.errors.password ? <p className="text-sm" style={{color:"red",padding:0,marginTop:-10}}>{formik.errors.password}</p> : null}
          <Button variant="gradient" type="submit" fullWidth>
          Login
          </Button>
         
        </CardBody>
        </form>
        <CardFooter className="pt-0">
          
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Button variant="text" onClick={handleSignupOpen} className="-mt-2">
               Signup
          </Button>
          </Typography>
        </CardFooter>
      </Card>
     
    );
  }

  export default LoginCard;