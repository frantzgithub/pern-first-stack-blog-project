import { app } from "./src/app";
import { Env } from "./src/utils/envalid/envalid";



app.listen(Env.PORT, () => {
    console.log(`app is listening on port ${Env.PORT}`)
})