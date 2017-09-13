import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationProvider {
    get host(): string {
        return '127.0.0.1';
    }

    get port(): number {
        return 9740;
    }

    get username(): string {
        return 'multichainrpc';
    }

    get password(): string {
        return '4X8GGjg1mHQngoGVvmBmagk3U8Ynxtu4nMWo1SRLMpW5';
    }
}
