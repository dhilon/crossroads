import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';


function ProfileDialog(props) {
    const { onClose, open } = props;
  
    return (
      <div>
        <Dialog onClose={onClose} open={open}>
          <DialogTitle>All About YOU</DialogTitle>
          Codename:
          <br></br>
          Created:
          <br></br>
          Hours Played:
          <br></br>
          Hours Won:
          <br></br>
          Highest Streak Rank:
          <br></br>
          Highest Points Rank: 
        </Dialog>
      </div>
      
    );
  }

ProfileDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ProfileDialog