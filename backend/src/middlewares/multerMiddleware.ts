import multer from "multer"

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        cb(null, "./upload/images")
    },
    filename: (req: any, file: { originalname: string }, cb: (arg0: null, arg1: string) => void) => {
        cb(null, Date.now()+"_"+file.originalname)
    }
})

const isImage = (req: any, file: any, cb: (arg0: Error | null, arg1?: boolean | undefined) => void) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    } else {
        cb(new Error("only images is allow"))
    }
}

const upload = multer({
    storage,
    fileFilter: isImage
})

export {upload}