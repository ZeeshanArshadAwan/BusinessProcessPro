import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadScript('/assets/js/sidebar.js');
  }

  loadScript(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = "text/javascript";
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  routing(routerName: string){
    
    this.router.navigateByUrl('/'+routerName);
  }

}
