import React from 'react';

const Error = ({message}) => {
   return (
      <div flex items-center>
         <div className='relative bg-red-200 max-w-xl px-4 py-2 text-red-800 rounded shadow w-full '>
            <span>{message}</span>
         </div>
      </div>
   );
};

export default Error;