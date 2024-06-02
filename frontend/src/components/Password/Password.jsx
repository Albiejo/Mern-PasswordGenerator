/* eslint-disable react/prop-types */
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh,faCopy } from '@fortawesome/free-solid-svg-icons';
import { Tooltip} from "@material-tailwind/react";
import Strength from './Strength';
 

const Password = ({password,handleRefresh}) => {
    
    const [copied, setCopied] = useState(false);
   

    const copyToClipboard = () => {
      const text = document.getElementById('npm-install-copy-text').value;
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
    };

    
  
    return (
        <div className="flex items-center justify-center">
        <div className="w-full max-w-[34rem]">
          <div className="relative">
            <label htmlFor="npm-install-copy-text" className="sr-only">Label</label>
            <input 
               
              id="npm-install-copy-text" 
              type="text" 
              className="h-10 col-span-6 text-black bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              value={password} 
              disabled 
            
            />
            
            <div className="flex space-x-2 absolute right-2.5 top-1/2 transform -translate-y-1/2">
            <Tooltip content="Copy" placement="top">
              <button 
                onClick={copyToClipboard} 
                className="text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
              >
                <span id="default-message" className={`inline-flex items-center ${copied ? 'hidden' : ''}`}>
                <FontAwesomeIcon className='cursor-pointer' icon={faCopy} />
                
                </span>
                <span id="success-message" className={`inline-flex items-center ${copied ? '' : 'hidden'}`}>
                  <svg className="w-3 h-3 text-blue-700 dark:text-blue-500 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917L5.724 10.5 15 1.5"/>
                  </svg>
                  <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>
                </span>
              </button>
              </Tooltip>
              <Tooltip content="Refresh" placement="top">
              <button 
                onClick={handleRefresh}
                className="text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
              >
                 <FontAwesomeIcon className='cursor-pointer'  icon={faRefresh} />
              </button>
              </Tooltip>
            </div>
          
          </div>
          <Strength password={password}/>
     
      </div>
        </div>
     
    );
}

export default Password