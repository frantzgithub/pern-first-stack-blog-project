import { ClipLoader } from "react-spinners"


export const Loading = () => {
  return (
    <>
        <ClipLoader
        color={'white'}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  )
}
