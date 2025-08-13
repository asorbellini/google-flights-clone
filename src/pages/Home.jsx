import Header from "../components/Headers";
import {Box} from "@mui/material"
import Hero from "../components/Hero";

export default function Home() {
    return(
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
            <Header />
            <Hero />
        </Box>
    )
}