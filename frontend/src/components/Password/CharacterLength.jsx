/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react"


const CharacterLength = ({length,setLength}) => {
 
  return (
    <div className="flex flex-col text-white">
    <div className="flex justify-between mb-2">
      <Typography
        variant="text"
        color="white"
        className="text-center"
      >
        Length
      </Typography>
      <Typography
        variant="text"
        color="white"
        className="text-center"
      >
        {length}
      </Typography>{/* Display the current length value */}
    </div>
    <input
  type="range"
  min="4"
  max="50"
  value={length}
  onChange={(e) => setLength(e.target.value)}
  className="w-full"
/>

  </div>
  )
}

export default CharacterLength