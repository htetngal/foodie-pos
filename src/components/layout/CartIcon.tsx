import { CartItem } from "@/types/cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, BadgeProps, Box, IconButton, styled } from "@mui/material";

interface Props {
  cartItems: CartItem[];
}

const CartIcon = ({ cartItems }: Props) => {
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <Box>
      <IconButton aria-label="cart">
        {cartItems.length ? (
          <StyledBadge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon
              sx={{
                fontSize: 40,
                color: "secondary.main",
              }}
            />
          </StyledBadge>
        ) : (
          <StyledBadge badgeContent={null} color="secondary">
            <ShoppingCartIcon
              sx={{
                fontSize: 40,
                color: "secondary.main",
              }}
            />
          </StyledBadge>
        )}
      </IconButton>
    </Box>
  );
};

export default CartIcon;
