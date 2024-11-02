import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%', 
                padding: '16px',
                color: 'white',
            }}
        >
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    placeholder="Pesquisar usuário"
                    InputProps={{
                        startAdornment: (
                            <SearchIcon sx={{ marginRight: '8px', color: '#A66FD9' }} />
                        ),
                    }}
                    sx={{
                        backgroundColor: '#fff', 
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#3c3c3c',
                            },
                            '&:hover fieldset': {
                                borderColor: '#4a4a4a',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#4a4a4a',
                            },
                        },
                        marginRight: '16px',
                    }}
                />
                <Button variant="contained" color="secondary">
                    Permissões
                </Button>
            </Box>
        </Box>
    );
};

export default SearchComponent;
