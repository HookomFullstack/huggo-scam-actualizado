import {Skeleton} from '@nextui-org/react';

export const LoaderTable = () => {
  return (
    <div>
        <Skeleton>
          <div className="h-6 bg-default-300"></div>
        </Skeleton>
        <Skeleton className='mt-3'>
          <div className="h-[500px]  bg-default-300"></div>
        </Skeleton>
    </div>
  )
}
