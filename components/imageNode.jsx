import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data: { birthday, name }, isConnectable }) => {
  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div class='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-80'>
        <div class='flex justify-between px-4 pt-4'>
          <button
            id='dropdownButton'
            data-dropdown-toggle='dropdown'
            class='inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5'
            type='button'
          >
            <svg
              fill='none'
              stroke='currentColor'
              stroke-width='1.5'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              class='w-6 h-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              ></path>
            </svg>
          </button>
          <button
            id='dropdownButton'
            data-dropdown-toggle='dropdown'
            class='inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5'
            type='button'
          >
            <svg
              fill='none'
              stroke='currentColor'
              stroke-width='1.5'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              class='w-6 h-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
              ></path>
            </svg>
          </button>
        </div>
        <div class='flex flex-col items-center pb-10 '>
          <img
            class='w-24 h-24 mb-3 rounded-full shadow-lg'
            src='/docs/images/people/profile-picture-3.jpg'
            alt='Bonnie image'
          />
          <h5 class='mb-1 text-xl font-medium text-gray-900 dark:text-white break-all'>
            {name}
          </h5>
          <span class='text-sm text-gray-500 dark:text-gray-400'>
            {birthday}
          </span>
        </div>
      </div>

      <Handle
        type='source'
        position={Position.Bottom}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </>
  );
});
