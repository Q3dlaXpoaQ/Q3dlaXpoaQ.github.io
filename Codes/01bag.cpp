// 01背包问题

#include <iostream>
#include <vector>

using namespace std;

int m,n;

int main(){
    vector<int> w,v;
    cin >>m>>n;

    vector<int> dp(m+1,0);
    for(int i=1;i<=n;i++){
        int get_w,get_v;
        cin >>get_w>>get_v;
        w.push_back(get_w);
        v.push_back(get_v);
    }

    for (int i=0;i<n;i++){
        for (int j=m;j>=w[i];j--){
            dp[j]=max(dp[j],dp[j-w[i]]+v[i]);
        }
    }
    cout << dp[m]<<endl;

    return 0;
    
}