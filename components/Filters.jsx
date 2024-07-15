import React, { useEffect, useState } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, TextField, Switch } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Filters = ({
  active = false,
  onChange = () => {},
  name,
  onNameChange = () => {},
  loginAfterDate,
  loginBeforeDate,
  onLoginAfterDateChange,
  onLoginBeforeDateChange
}) => {
  const handleChange = (event) => {
    onChange(event.target.value === 'false' ? false : event.target.value);
  };

  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  const [checked, setChecked] = useState(false);
  const [checkedAfter, setCheckedAfter] = useState(false);

  useEffect(() => {
    if (!checked) onLoginBeforeDateChange(undefined);
    else onLoginBeforeDateChange(dayjs());
  }, [checked]);

  useEffect(() => {
    if (!checkedAfter) onLoginAfterDateChange(undefined);
    else onLoginAfterDateChange(dayjs());
  }, [checkedAfter]);

  return (
    <Grid container spacing={4} padding={10}>
      <Grid item xs={6} padding={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Activo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={active}
            onChange={handleChange}
            label="Activo"
          >
            <MenuItem value={undefined}>Todos</MenuItem>
            <MenuItem value={true}>Activo</MenuItem>
            <MenuItem value={'false'}>No activo</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} padding={2}>
        <FormControl fullWidth margin="2">
          <TextField
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6} padding={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Entraron por última vez antes de
          {checked && <DateCalendar value={loginBeforeDate} onChange={onLoginBeforeDateChange} />}
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6} padding={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Switch
            checked={checkedAfter}
            onChange={(e) => setCheckedAfter(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Entraron por última vez después de
          {checkedAfter && <DateCalendar value={loginAfterDate} onChange={onLoginAfterDateChange} />}
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default Filters;
