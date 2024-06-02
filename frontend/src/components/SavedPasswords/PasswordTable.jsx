import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Dialog,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
  import { useState, useEffect } from "react";
  import { pwdApiRequest } from "../../config/axios.js";
  import { useSelector } from "react-redux";
  const TABLE_HEAD = ["Password", "Action"];
  import toast from "react-hot-toast";
  import { useLocation, useNavigate } from "react-router-dom";
  
  const PasswordTable = () => {


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const handleOpen = () => setOpen(!open);
    let { userInfo } = useSelector((state) => state.userAuth);
    const [passwords, setPasswords] = useState([]);
    const navigate=useNavigate();
    const location = useLocation()
    
    const deletePassword = async (id) => {
      try {
        const response = await pwdApiRequest({
          method: "delete",
          url: "/delete",
          data: {
            id: id,
          },
        });
        if (response.data) {
          toast.success("Password Deleted");
          fetchData();
        }
      } catch (error) {
        console.error("Error deleting passwords:", error);
      }
    };
  
    const fetchData = async (page) => {
      try {
        const response = await pwdApiRequest({
          method: "get",
          url: `/getPassword?userId=${userInfo._id}&page=${page}`,
        });
        console.log(response.passwords);
        if (response.passwords) {
          setPasswords(response.passwords);
          setTotalPages(() => {
            return Math.ceil(response.totalPasswords/6);
          });
        }
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };
  
    useEffect(() => {

      const queryParams = new URLSearchParams(location.search);
      const pageParam = queryParams.get("page");
      setPage(pageParam ? parseInt(pageParam, 10) : 1);
      fetchData(pageParam);

    }, [location.search]);
  
  
    return (
      <>
    
        <Card className="w-200">
          
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-1 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h4" color="blue-gray">
                  Saved Passwords
                </Typography>
              </div>
            </div>
          </CardHeader>

          <CardBody className="overflow-scroll">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {passwords.map(({ password, _id }, index) => {
                  const classes = "p-4 border-b border-blue-gray-50";
  
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-1">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {password}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Button
                            size="sm"
                            color="red"
                            className="font-normal w-20"
                            onClick={() => {
                              setId(_id); // Set the id of the password to be deleted
                              handleOpen(); // Open the dialog
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
             Page {page} of {totalPages}
            </Typography>
            {totalPages>1&&<div className="flex gap-2">
              <Button variant="outlined" size="sm" onClick={() => {
                const nextPage = page - 1 > 0 ? page - 1 : 1;
                navigate(`?page=${nextPage}`);
              }}>
                Previous
              </Button>
              <Button variant="outlined" size="sm" onClick={() => {
                const nextPage = page + 1 <= totalPages ? page + 1 : totalPages;
                navigate(`?page=${nextPage}`);
              }}>
                Next
              </Button>
            </div>}
            
          </CardFooter>
        </Card>
  
  
        <Dialog open={open} handler={handleOpen} size="xs">
          <DialogBody>Are you sure want to delete this password?</DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
              size="sm"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              size="sm"
              color="green"
              onClick={() => {
                deletePassword(id);
                handleOpen();
              }}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  };
  
  export default PasswordTable;