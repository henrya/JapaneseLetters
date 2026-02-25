import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import { QuizType } from '../hooks/useQuiz';
import styles from './Header.module.less';

type HeaderProps = {
  onNavClick: (quiz: QuizType) => void;
};

const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Only consider it "open" if anchorEl is not null AND is actually in the document.  // This helps avoid the "anchorEl is invalid" warning in some testing environments.
  const open = Boolean(anchorEl && document.body.contains(anchorEl));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (quizType: QuizType) => {
    onNavClick(quizType);
    handleClose();
  };

  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar>
        <Box>
          <Button className={styles.navButton} onClick={() => onNavClick('hiragana')}>
            Hiragana
          </Button>
          <Button className={styles.navButton} onClick={() => onNavClick('katakana')}>
            Katakana
          </Button>
          <Button
            id="vocabulary-button"
            aria-controls={open ? 'vocabulary-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={styles.navButton}
          >
            Vocabulary
          </Button>
          <Menu
            id="vocabulary-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'vocabulary-button',
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick('n5')}>N5</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('n4')}>N4</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('n3')}>N3</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('n2')}>N2</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('n1')}>N1</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('vocabulary')}>All Vocabulary</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
