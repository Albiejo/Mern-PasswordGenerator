/* eslint-disable react/prop-types */


const Checkboxes = ({checkboxData,handleCheckboxChange}) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
      {checkboxData.map((checkbox,index)=>{
        return(
        <div key={index} className="flex items-center space-x-1">
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(index)}
          checked={checkbox.state}
          className="h-5 w-5 rounded focus:ring-2 focus:ring-[#2B2D42]-500"
        />
        <label className="text-sm text-white">{checkbox.title}</label>
      </div>
        )
      })}
    </div>
      );
}

export default Checkboxes