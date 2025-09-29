import { Component,OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/modules/product/model';
import { MENU } from 'src/app/shared/constant';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
    .top-nav-menu,
    .bottom-nav-menu {
      display:flex;
      align-items:center;
      gap:5px;

    }
    .top-nav-menu-item a,
    .top-nav-menu-item button {
      display:flex;
      justify-content:center;
      align-items:center;
      gap:4px;
      font-size:1.3rem;
      text-transform:uppercase;
      transition:all 0.5s;
    }
    .bottom-nav-menu-item a:hover {
      font-weight:600;
      border-bottom:4px solid #374151;
    }

    .active-link {
      font-weight:600;
      border-bottom:4px solid #374151;
    }
    `
  ]
})
export class HeaderComponent implements OnInit{
  cart:Product[]=[];
  menulist:{title:string;path:string}[]=MENU;
  isMenu=false;
  currentTheme: 'light' | 'dark' = 'light';
  constructor(private cartService:CartService, public authService:AuthService, private themeService: ThemeService){
  }
  openMenu(){
    this.isMenu=true;
  }
  closeMenu(){
    this.isMenu=false;
  }
  logOut(){
    this.authService.logout();
  }
  ngOnInit(): void {
    this.cart=this.cartService.getCart;
    this.currentTheme = this.themeService.current;
  }
  toggleTheme(){
    this.currentTheme = this.themeService.toggle();
  }
}
