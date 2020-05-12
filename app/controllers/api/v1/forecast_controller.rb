class Api::V1::ForecastController < ApplicationController

  def index
    zip = params[:zip]

    url = "http://api.openweathermap.org/data/2.5/weather?q=#{zip}&appid=#{ENV["OPEN_WEATHER_API_KEY"]}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)

    status 200
    content_type :json
    render json: parsed_response
  end

  private

  def weather_params
    params.permit(:zip)
  end

end
