import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font
} from "@react-pdf/renderer";
import paid from "../../utils/paid.png";
import calibriRegular from "../../utils/fonts/calibri-font-family/calibri-regular.ttf";
import calibriBold from "../../utils/fonts/calibri-font-family/calibri-bold.ttf";
import calibriBoldItalic from "../../utils/fonts/calibri-font-family/calibri-bold-italic.ttf";

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row"
  },
  flexBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5
  },
  text: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 5,
    fontWeight: "thin"
  },
  page: {
    padding: 40,
    fontFamily: "Calibri"
  },
  viewBox: {
    width: "100%",
    height: "100vh"
  },
  header: {
    borderBottom: "2px solid #000",
    paddingBottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  invoice: {
    fontSize: 30,
    fontWeight: "bold"
  },
  logo: {
    width: 50,
    height: 50,
    mixBlendMode: "multiply"
  },
  width10: {
    width: "10%"
  },
  width30: {
    width: "30%"
  },
  userData: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

Font.register({
  family: "Calibri",
  fonts: [
    {
      src: calibriRegular
    },
    {
      src: calibriBold,
      fontWeight: "bold"
    },
    {
      src: calibriBoldItalic,
      fontWeight: "italic"
    }
  ]
});

const Invoice = (props) => {
  // if (
  //   props?.purchasedItems?.length > 0 &&
  //   props?.user &&
  //   props?.userEmail &&
  //   props?.userAddress
  // ) {
  //   props.setReady(true);
  // }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <Text>Hello world</Text> */}
        <View style={styles.header}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            {/* <Image src={black_logo} style={styles.logo}></Image> */}
            <Text>Recipee shop</Text>
          </View>
          <View>
            <Text style={styles.invoice}>INVOICE</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: 30
          }}
        >
          <View style={styles.userData}>
            <View
              style={{
                fontSize: 13
              }}
            >
              <View style={styles.text}>
                <Text>Invoice number : </Text>
                <Text>{props.refNumber}</Text>
              </View>
              <View style={styles.text}>
                <Text>Date : </Text>
                <Text>{props.paymentDataTime}</Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  borderTop: "1px solid #000",
                  paddingTop: 15
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "ultrabold",
                    marginBottom: 5
                  }}
                >
                  Total
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "ultrabold" }}>
                  INR {props.amount}/-
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              fontSize: 13,
              textAlign: "right",
              width: "50%"
            }}
          >
            <Text>Invoice to:</Text>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 20,
                fontWeight: "ultraBold"
              }}
            >
              {props.user}
            </Text>
            <View>
              <Text style={styles.text}>{props.userEmail}</Text>
              <Text style={styles.text}>{props.userAddress}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 50
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
              fontSize: 13,
              fontWeight: "semibold",
              paddingVertical: 10
            }}
          >
            <Text style={styles.width10}>Sl no</Text>
            <Text style={styles.width30}>Item</Text>
            <Text style={styles.width10}>Quantity</Text>
            <Text style={styles.width10}>Price</Text>
            <Text style={styles.width10}>Total</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              fontSize: 13,
              borderBottom: "1px solid #000",
              paddingVertical: 10
            }}
          >
            {props.purchasedItems?.map((item, index) => {
              return (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.width10}>{index + 1}</Text>
                  <Text style={styles.width30}>{item[0]}</Text>
                  <Text style={styles.width10}>{item[1]}</Text>
                  <Text style={styles.width10}>Rs. {item[2]}/-</Text>
                  <Text style={styles.width10}>
                    Rs. {item[1] * parseInt(item[2])}/-
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View>
            <View
              style={{
                fontSize: 12
              }}
            >
              <Text style={{ marginVertical: 3 }}>Payment method</Text>
              <Text style={{ marginVertical: 3 }}>Bank name : Axis Bank</Text>
              <Text style={{ marginVertical: 3 }}>
                Account number : 1234567890
              </Text>
            </View>
            <View
              style={{
                marginVertical: 50,
                fontSize: 15,
                // fontStyle: "italic",
                fontWeight: "bold"
              }}
            >
              <Text>Thank you for your purchase</Text>
            </View>
            <View style={{ fontSize: 12 }}>
              <Text style={{ marginVertical: 3 }}>Contact us</Text>
              <Text style={{ marginVertical: 3 }}>+91764589020</Text>
              <Text style={{ marginVertical: 3 }}>
                contact@recipee.shop.com
              </Text>
            </View>
          </View>
          <View style={{ fontSize: 12 }}>
            <View style={styles.flexBetween}>
              <Text>Total:</Text>
              <Text>Rs. {props.amount - 0.05 * props.amount}/-</Text>
            </View>
            <View style={styles.flexBetween}>
              <Text style={{ marginTop: 3 }}>SGST:</Text>
              <Text style={{ marginTop: 3 }}>2.5%</Text>
            </View>
            <View style={styles.flexBetween}>
              <Text style={{ marginTop: 3 }}>CGST:</Text>
              <Text style={{ marginTop: 3 }}>2.5%</Text>
            </View>
            <View style={styles.flexBetween}>
              <Text>SubTotal:</Text>
              <Text>Rs. {props.amount}/-</Text>
            </View>

            <View style={{ width: 100, height: 100, marginTop: 50 }}>
              <Image src={paid}></Image>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const ViewInvoice = () => {
  return (
    <PDFViewer style={styles.viewBox}>
      <Invoice />
    </PDFViewer>
  );
};

export { Invoice, ViewInvoice };
