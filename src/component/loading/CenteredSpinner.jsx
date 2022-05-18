import { CircularProgress } from "@mui/material";

const CenteredSpinner = () => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <CircularProgress />
        </div>
    );
}

export default CenteredSpinner;