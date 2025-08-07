'use client'
const ErrorBoundary = ({error,reset}:{error:Error,reset:()=>void}) => {
    return ( <>
        <div>{error.message} </div> 
        <button onClick={reset} className=" border">Try again</button>
    </>
     );
}
 
export default ErrorBoundary;