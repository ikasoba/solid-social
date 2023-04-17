import { Controller, Get } from "@nestjs/common";

@Controller("/v1")
export class V1ApiController {
  @Get("/status")
  status() {
    return "v1 api is available.";
  }
}
