import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `Learning Camp | ${title}`
    }, [title])
}

export default useTitle;