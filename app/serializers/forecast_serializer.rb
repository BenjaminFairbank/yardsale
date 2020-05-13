class ForecastSerializer < ActiveModel::Serializer
  attributes :city, :currentTemperature
end
