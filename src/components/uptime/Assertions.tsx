import { ReactNode } from 'react';

export const Assertions = ({ children }: { children: ReactNode }) => {
    return (
        <div className='mt-5'>
            <label htmlFor="assertions" className='block text-medium font-medium text-gray-900'>
                Assertions (Optional)
            </label>
            <span className='text-xs text-gray-500'>Your test is successful:</span>
            <div className='mt-2 border p-4'>
                {children}
            </div>
        </div>
    )
}
