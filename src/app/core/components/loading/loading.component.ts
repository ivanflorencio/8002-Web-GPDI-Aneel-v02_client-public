import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
    @Input() type: 'fullparent' | 'fullscreen' | 'inline' = 'fullparent';
    @Input() timeout = 0;
    @Input() size = '2x';
    @Input() color;
    @Input('background') backgroundColor;

    @Input() isLoading: boolean;

    ngOnInit() {
        if (!this.color) {
            this.color = this.type === 'inline' ? '#666' : '#007984';
        }
        if (!this.backgroundColor) {
            this.backgroundColor = this.type === 'inline' ? 'transparent' : 'rgba(128,128,128,0.5)';
        }
    }

    /**
     * @description Tempo de exibição do loading. 0 = sem fim
     */
    show(timeout = 0) {
        this.isLoading = true;
        if (this.timeout > 0 || timeout > 0) {
            setTimeout(
                () => {
                    this.hide();
                },
                timeout > 0 ? timeout : this.timeout
            );
        }
    }

    hide() {
        this.isLoading = false;
    }

    get isFullscreen() {
        return this.type === 'fullscreen';
    }

    get typeclass() {
        return this.type;
    }
}
