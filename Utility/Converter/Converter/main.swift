//
//  main.swift
//  Converter
//
//  Created by 葉山拓朗 on 2018/08/31.
//  Copyright © 2018年 葉山拓朗. All rights reserved.
//

import Foundation

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
    
    let fileHandle = FileHandle(forUpdatingAtPath: savePath)
    for birthday in birthdays {
        print(birthday)
        var writeData = birthday.name?.data(using: String.Encoding.utf8)
    }
    
} catch {
    print("data error",error)
}

