---
title: 初探JavaFx
date: '2019-10-28 17:28:36'
lastmod: '2019-10-28 17:28:36'
categories:
- 学习笔记
tags: []
---




## IDEA下开发JavaFx Application



> New > project > JavaFx Application



## 添加SceneBuilder 



> 1. 下载SceneBuilder

> 2. file | setting > JavaFx > add path



## 设置自定义图标



> ` primaryStage.getIcons().add(new Image("file:res/internet.png"));`



## 打包生成exe



> File | project structure > Artifacts > JavaFx >(class | title | Navite Bundle)



注意目录文件要能找到



## 事件绑定



`fxml`

> `onAction add`



`Java`

> 添加函数



## fx:id 对象属性修改



> 1. 添加一个fxml成员变量

> 2. 调用setText("");



## 我的代码



`MainApp.fxml`

```xml

<?xml version="1.0" encoding="UTF-8"?>



<?import javafx.geometry.Insets?>

<?import javafx.scene.control.Button?>

<?import javafx.scene.control.DialogPane?>

<?import javafx.scene.control.Label?>

<?import javafx.scene.control.TextArea?>

<?import javafx.scene.control.TextField?>

<?import javafx.scene.layout.FlowPane?>

<?import javafx.scene.layout.Pane?>

<?import javafx.scene.text.Font?>



<FlowPane maxHeight="-Infinity" maxWidth="-Infinity" minHeight="-Infinity" minWidth="-Infinity" prefHeight="400.0" prefWidth="800.0" xmlns="http://javafx.com/javafx/8.0.121" xmlns:fx="http://javafx.com/fxml/1" fx:controller="cn.thinkmoon.CSMA_CD.MainApp">

<children>

    <Pane prefHeight="400.0" prefWidth="800.0">

        <children>

            <Button layoutX="154.0" layoutY="206.0" mnemonicParsing="false" onAction="#handleSendDataPackage" text="发送数据包">

                <font>

                    <Font size="14.0" />

                </font></Button>

            <Button layoutX="283.0" layoutY="206.0" mnemonicParsing="false" text="重置操作">

                <font>

                    <Font size="14.0" />

                </font></Button>

            <TextArea layoutX="500.0" layoutY="51.0" prefHeight="299.0" prefWidth="277.0" />

            <Label fx:id="host1SendNum" layoutX="43.0" layoutY="70.0" text="主机1所需发送的数据包数：">

                <font>

                    <Font size="17.0" />

                </font>

            </Label>

            <Label layoutX="43.0" layoutY="130.0" text="主机2所需发送的数据包数：">

                <font>

                    <Font size="17.0" />

                </font>

            </Label>

            <Label layoutX="52.0" layoutY="291.0" text="主机1">

                <font>

                    <Font size="18.0" />

                </font>

            </Label>

            <Label layoutX="410.0" layoutY="291.0" text="主机2">

                <font>

                    <Font size="18.0" />

                </font>

            </Label>

            <TextField layoutX="279.0" layoutY="71.0" />

            <TextField layoutX="279.0" layoutY="130.0" />

            <Label layoutX="292.0" layoutY="14.0" text="模拟以太网发送过程">

                <font>

                    <Font size="17.0" />

                </font>

            </Label>

            <Label layoutX="48.0" layoutY="327.0" style="-fx-border-width: 1; -fx-border-color: #218ada;" styleClass="tip" text="信道空闲" textFill="#218ada">

                <padding>

                    <Insets bottom="2.0" left="2.0" right="2.0" top="1.0" />

                </padding>

            </Label>

            <Label layoutX="406.0" layoutY="327.0" style="-fx-border-width: 1; -fx-border-color: #218ada;" styleClass="tip" text="信道空闲" textFill="#218ada">

                <padding>

                    <Insets bottom="2.0" left="2.0" right="2.0" top="1.0" />

                </padding>

            </Label>

            <TextField layoutX="114.0" layoutY="292.0" prefHeight="23.0" prefWidth="19.0" />

            <TextField layoutX="140.0" layoutY="292.0" prefHeight="23.0" prefWidth="19.0" />

            <TextField layoutX="170.0" layoutY="292.0" prefHeight="23.0" prefWidth="19.0" />

            <TextField layoutX="199.0" layoutY="292.0" prefHeight="23.0" prefWidth="19.0" />

            <TextField layoutX="226.0" layoutY="292.0" prefHeight="23.0" prefWidth="19.0" />

            <TextField layoutX="257.0" layoutY="292.0" prefHeight="23.0" prefWidth="19.0" />

            <TextField layoutX="283.0" layoutY="292.0" prefHeight="23.0" prefWidth="19.0" />

            <TextField layoutX="311.0" layoutY="292.0" prefHeight="23.0" prefWidth="19.0" />

            <TextField layoutX="340.0" layoutY="292.0" prefHeight="23.0" prefWidth="19.0" />

            <TextField layoutX="369.0" layoutY="292.0" prefHeight="23.0" prefWidth="19.0" />

        </children>

    </Pane>

      <DialogPane />

</children>

</FlowPane>



```

`MainApp.java`

```java

package cn.thinkmoon.CSMA_CD;



import javafx.application.Application;

import javafx.event.ActionEvent;

import javafx.fxml.FXML;

import javafx.fxml.FXMLLoader;

import javafx.scene.Parent;

import javafx.scene.Scene;

import javafx.scene.control.Label;

import javafx.scene.image.Image;

import javafx.stage.Stage;



import java.io.IOException;



public class MainApp extends Application {

    private Stage primaryStage;

    @FXML

    private Label host1SendNum;

    @Override

    public void start(Stage primaryStage) throws Exception{

        this.primaryStage = primaryStage;

        initRootLayout();

    }

    /**

     * 初始化主界面布局

     */

    public void initRootLayout() {

        try {

            Parent root = FXMLLoader.load(getClass().getResource("view/MainApp.fxml"));

            primaryStage.setTitle("CSMA/CD协议仿真及演示");

            primaryStage.setScene(new Scene(root, 800, 400));

            primaryStage.setResizable(false);

            primaryStage.getIcons().add(new Image("file:res/internet.png"));

            primaryStage.show();

        } catch (IOException e) {

            e.printStackTrace();

        }

    }

    public static void main(String[] args) {

        launch(args);

    }

    @FXML

    private void handleSendDataPackage(ActionEvent event) {



    }

}



```

