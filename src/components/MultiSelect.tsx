import { Checkbox, Chip } from "@mui/material";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  testIds: number[];
  handleOnChange: (value: any) => void;
  categoryName: any[];
  label?: string;
}

const MultiSelect = ({
  testIds,
  handleOnChange,
  categoryName,
  label,
}: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={testIds}
        onChange={handleOnChange}
        multiple
        //selectedItemIds (enter automatly)
        renderValue={(selectedIds) => {
          return selectedIds
            .map((id) =>
              categoryName.find((categoryName) => categoryName.id === id)
            )
            .map((item) => (
              <Chip key={item.id} label={item.name} sx={{ mr: 1 }} />
            ));
        }}
      >
        {categoryName.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            <Checkbox checked={testIds.includes(item.id)} />
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
