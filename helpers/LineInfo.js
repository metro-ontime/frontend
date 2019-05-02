import { MenuItem, ListItemAvatar, Avatar } from '@material-ui/core';

const lines = [
  { name: 'Blue', color: '#2461aa', id: 801 },
  { name: 'Red', color: '#fc1920', id: 802 },
  { name: 'Green', color: '#6bbc46', id: 803 },
  { name: 'Gold', color: '#ffb200', id: 804 },
  { name: 'Purple', color: '#9561a8', id: 805 },
  { name: 'Expo', color: '#51c8e8', id: 806 },
];

const linesById = {
  801: { name: 'Blue', color: '#2461aa'},
  802: { name: 'Red', color: '#fc1920'},
  803: { name: 'Green', color: '#6bbc46'},
  804: { name: 'Gold', color: '#ffb200'},
  805: { name: 'Purple', color: '#9561a8'},
  806: { name: 'Expo', color: '#51c8e8'},
};

const linesByName = {
  Blue: { id: 801, color: '#2461aa'},
  Red: { id: 802, color: '#fc1920'},
  Green: { id: 803, color: '#6bbc46'},
  Gold: { id: 804, color: '#ffb200'},
  Purple: { id: 805, color: '#9561a8'},
  Expo: { id: 806, color: '#51c8e8'},
  "All Lines": { color: '#dddddd'}
};

const lineLinks = (classes) => ( 
  lines.map((metLine,i) => (
      <MenuItem value={`${metLine.name}`} key={i}>
        <div style={{display: "flex", alignItems: "center"}}>
        <ListItemAvatar>
          <Avatar className={ classes.avatar }>
            <div
              style={{
                backgroundColor: metLine.color,
                width: '100%',
                padding: 0,
                height: '100%',
                margin: 0,
                borderRadius: '50%',
              }}
            />
          </Avatar>
        </ListItemAvatar>
        {metLine.name}
        </div>
      </MenuItem>
  ))
 )

export { lines, linesById, linesByName, lineLinks };
