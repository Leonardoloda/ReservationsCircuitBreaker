"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationCircuitBreaker = void 0;
class ReservationCircuitBreaker {
    constructor(mainApi, alternativeApi) {
        this.mainApi = mainApi;
        this.alternativeApi = alternativeApi;
        this.TIMEOUT = 1000;
        this.isOpen = false;
        this.lastOpenedAt = null;
    }
    processReservation(reservation) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info("Server INFO", `processing reservation`, reservation.id);
            console.info("Server INFO", "Circuit Breaker state", {
                isOpen: this.isOpen,
                lastOpenedAt: this.lastOpenedAt,
            });
            if (this.isOpen) {
                console.info("Server INFO", "CircuitBreaker is opened, using alternative API", reservation.id);
                if (this.lastOpenedAt && Date.now() - this.lastOpenedAt < this.TIMEOUT)
                    return this.alternativeApi.processReservation(reservation);
                else
                    this.disableCircuitBreaker();
            }
            console.info("Server INFO", "CircuitBreaker is closed, going to main API", reservation.id);
            try {
                const mainApiResult = yield this.mainApi.processReservation(reservation);
                console.info("Server INFO", "main api responded with", mainApiResult);
                this.disableCircuitBreaker();
                return mainApiResult;
            }
            catch (error) {
                console.info("Server ERROR", "main API is not working", error);
                this.enableCircuitBreaker();
                return this.processReservation(reservation);
            }
        });
    }
    enableCircuitBreaker() {
        console.debug("Circuit is open");
        this.isOpen = true;
        this.lastOpenedAt = Date.now();
    }
    disableCircuitBreaker() {
        console.debug("CIrcuit is close");
        this.isOpen = false;
        this.lastOpenedAt = null;
    }
}
exports.ReservationCircuitBreaker = ReservationCircuitBreaker;
