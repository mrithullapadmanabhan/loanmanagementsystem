import { toast } from "react-toastify"

export const withToast = (
  apiCall: Promise<any>,
  entityName: string,
  verb: string,
  options: {
    pending?: boolean,
    error?: boolean,
    success?: boolean,
  } = { pending: false, error: true, success: true }
) => {
  return toast.promise(apiCall, {
    pending: options.pending ? `${verb}ing ${entityName}` : undefined,
    error: options.error ? {
      render(e) {
        return (e && e.data) ? e.data.toString() : `Error occured while ${verb.toLowerCase()}ing ${entityName}`
      },
    } : undefined,
    success: options.success ? `Successfully ${verb.toLowerCase()}ed ${entityName}` : undefined,
  })
}