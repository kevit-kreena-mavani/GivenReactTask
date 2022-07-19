import Card from "./Card";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const SearchBar = (props) => {
  // const [searchTerm, getSearchTerm] = useState("");

  // const SearchTermHandler = (event) =>{
  //     getSearchTerm(event.target.value)
  // }

  const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "gray",
      },
    },
  });

  return (
    <Card>
      <div>
        <StyledTextField
          type="search"
          onChange={props.onChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Card>
  );
};

export default SearchBar;
