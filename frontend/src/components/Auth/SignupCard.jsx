/* eslint-disable react/prop-types */
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
  import { XMarkIcon } from '@heroicons/react/24/outline';
  import { AuthContext } from "../../context/authContext";
  import { useContext } from "react";
  import { useState } from "react";
  import { validate } from "../../validations/RegisterValidation";
  import {userApiRequest} from '../../config/axios' 
  import {setUserCredentials} from '../../redux/authSlice'
  import toast from 'react-hot-toast'
  import { useDispatch } from "react-redux";
  
  const initialValues = {
    email: "",
    password: "",
    name: "",
    confirm_password: "",
  };
  
  const SignupCard = ({ onClose }) => {
    const { handleSignupOpen } = useContext(AuthContext);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const dispatch = useDispatch();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      const errors = validate({ ...formValues, [name]: value });
      setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    };
  
    
  
    const submitHandler = async (e) => {
      e.preventDefault();
      const errors = validate(formValues);
      setFormErrors(errors);
      console.log(Object.values(errors));
      if (Object.values(errors).every((error) => error === "")) {
        try {
          
        
        const response = await userApiRequest({
          method: 'post',
          url: '/signup',
          data:formValues
        },{withCredentials:true})
        if(response.userData){
          dispatch(setUserCredentials(response.userData))
          toast.success("User Registered")
          onClose()
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
  
      }
    };
  
    return (
      <Card className="w-96">
         <form onSubmit={submitHandler}>
        <CardBody className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Typography variant="h3" color="black" className="text-center">
              Signup
            </Typography>
            <XMarkIcon
              className="h-6 w-6 text-gray-500 cursor-pointer"
              onClick={onClose} // Adding the onClose prop to handle the close action
            />
          </div>
          <Input
            label="Name"
            onChange={handleChange}
            value={formValues.name}
            name="name"
            size="sm"
            crossOrigin={undefined}
            color="black"
            className="bg-white bg-opacity-50"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          {formErrors.name ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.name}
            </p>
          ) : null}
          <Input
            label="Email"
            size="sm"
            onChange={handleChange}
            value={formValues.email}
            name="email"
            crossOrigin={undefined}
            color="black"
            className="bg-white bg-opacity-50"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          {formErrors.email ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.email}
            </p>
          ) : null}
          <Input
            label="Phone"
            onChange={handleChange}
            value={formValues.phone}
            name="mobile"
            size="sm"
            crossOrigin={undefined}
            color="black"
            className="bg-white bg-opacity-50"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          {formErrors.mobile ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.mobile}
            </p>
          ) : null}
          <Input
            label="Password"
            type="password"
            onChange={handleChange}
            value={formValues.password}
            name="password"
            size="sm"
            crossOrigin={undefined}
            color="black"
            className="bg-white bg-opacity-50"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          {formErrors.password ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.password}
            </p>
          ) : null}
          <Input
            label="Confirm Password"
            type="password"
            size="sm"
            crossOrigin={undefined}
            color="black"
            onChange={handleChange}
            value={formValues.confirm_password}
            name="confirm_password"
            className="bg-white bg-opacity-50"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          {formErrors.confirm_password ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.confirm_password}
            </p>
          ) : null}
          <Button variant="gradient" fullWidth type="submit">
            Sign up
          </Button>
        </CardBody>
        </form>
        <CardFooter className="pt-0">
          
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Button variant="text" onClick={handleSignupOpen} className="-mt-2">
              Login
            </Button>
          </Typography>
        </CardFooter>
      </Card>
    );
  };
  
  export default SignupCard;