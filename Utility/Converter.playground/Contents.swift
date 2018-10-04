//: Playground - noun: a place where people can play

import UIKit

let path = "/Users/rastakulow/Documents/Project/AlexaSkill/Converter.playground/Resources/birthdays.json"
let savePath = "/Users/rastakulow/Documents/Project/AlexaSkill/Converter.playground/Resources/birthdays.csv"


struct Birthday: Codable {
    var name: String?
    var id: Int?
    var birthday: String?
}

do {
    print("path = ",path)
    let url = URL(fileURLWithPath: path)
    print("url = ",url)
    let data = try Data(contentsOf: url)
    print(data)
    
    let birthdays = try JSONDecoder().decode([Birthday].self, from: data)
    
    var csvFormat = ""
    let fileHandle = FileHandle(forUpdatingAtPath: savePath)
    for birthday in birthdays {
        print(birthday)
        var writeData = birthday.name?.data(using: NSUTF8StringEncoding)
    }
    
} catch {
    print("data error",error)
}
